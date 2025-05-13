import './App.css'
import EntryForm from "./components/entry-form/EntryForm.tsx";
import EntryList from "./components/entry-list/EntryList.tsx";

function App() {
  return (
      <div className={'container'}>
        <EntryForm/>
          <EntryList/>
      </div>
      )
}

export default App
