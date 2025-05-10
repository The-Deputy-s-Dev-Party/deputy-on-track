use axum::{
    Json, Router,
    extract::{Path, State},
    http::{Method, StatusCode},
    response::IntoResponse,
    routing::{post, put},
};
use dotenv::dotenv;
use serde::{Deserialize, Serialize};
use std::env;
use std::{
    net::SocketAddr,
    sync::{Arc, Mutex},
};
use tower_http::cors::Any;
use tower_http::cors::CorsLayer;
use utoipa::{OpenApi, ToSchema};
use utoipa_swagger_ui::SwaggerUi;

#[derive(Serialize, Deserialize, Clone, ToSchema)]
struct FoodIntakeEntry {
    name: String,
    consumed_amount: f32,
    energy_kcal: f32,
}

type AppState = Arc<Mutex<Vec<FoodIntakeEntry>>>;

#[derive(OpenApi)]
#[openapi(
    paths(
        create_entry,
        list_entries,
        update_entry,
        delete_entry,
    ),
    components(schemas(FoodIntakeEntry)),
    tags((name = "Food Entries", description = "Track food intake"))
)]
struct ApiDoc;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenv().ok();
    let backend_port = env::var("BACKEND_SERVER_PORT")?.parse()?;

    tokio::spawn(async move {
        let state: AppState = Arc::new(Mutex::new(Vec::new()));

        let app = Router::new()
            .route("/entries", post(create_entry).get(list_entries))
            .route("/entries/{index}", put(update_entry).delete(delete_entry))
            .merge(SwaggerUi::new("/swagger-ui").url("/api-doc/openapi.json", ApiDoc::openapi()))
            .with_state(state.clone())
            .layer(
                CorsLayer::new()
                    .allow_origin(Any)
                    .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
                    .allow_headers([axum::http::header::CONTENT_TYPE]),
            );

        serve(app, backend_port).await;
    })
    .await?;

    Ok(())
}

async fn serve(app: Router, port: u16) {
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[utoipa::path(
    post,
    path = "/entries",
    request_body = FoodIntakeEntry,
    responses(
        (status = 201, description = "Entry created successfully"),
        (status = 500, description = "Internal server error")
    ),
    tag = "Food Entries"
)]
async fn create_entry(
    State(state): State<AppState>,
    Json(entry): Json<FoodIntakeEntry>,
) -> impl IntoResponse {
    let mut entries = state.lock().unwrap();
    entries.push(entry);
    StatusCode::CREATED
}

#[utoipa::path(
    get,
    path = "/entries",
    responses(
        (status = 200, description = "List all food entries", body = [FoodIntakeEntry]),
        (status = 500, description = "Internal server error")
    ),
    tag = "Food Entries"
)]
async fn list_entries(State(state): State<AppState>) -> impl IntoResponse {
    let entries = state.lock().unwrap();
    Json(entries.clone())
}

#[utoipa::path(
    put,
    path = "/entries/{index}",
    request_body = FoodIntakeEntry,
    params(
        ("index" = usize, Path, description = "Index of the entry to update")
    ),
    responses(
        (status = 200, description = "Entry updated successfully"),
        (status = 404, description = "Entry not found"),
        (status = 500, description = "Internal server error")
    ),
    tag = "Food Entries"
)]
async fn update_entry(
    Path(index): Path<usize>,
    State(state): State<AppState>,
    Json(updated): Json<FoodIntakeEntry>,
) -> impl IntoResponse {
    let mut entries = state.lock().unwrap();

    if index >= entries.len() {
        return StatusCode::NOT_FOUND.into_response();
    }

    entries[index] = updated;
    StatusCode::OK.into_response()
}

#[utoipa::path(
    delete,
    path = "/entries/{index}",
    params(
        ("index" = usize, Path, description = "Index of the entry to delete")
    ),
    responses(
        (status = 204, description = "Entry deleted successfully"),
        (status = 404, description = "Entry not found"),
        (status = 500, description = "Internal server error")
    ),
    tag = "Food Entries"
)]
async fn delete_entry(
    Path(index): Path<usize>,
    State(state): State<AppState>,
) -> impl IntoResponse {
    let mut entries = state.lock().unwrap();

    if index >= entries.len() {
        return StatusCode::NOT_FOUND.into_response();
    }

    entries.remove(index);
    StatusCode::NO_CONTENT.into_response()
}
