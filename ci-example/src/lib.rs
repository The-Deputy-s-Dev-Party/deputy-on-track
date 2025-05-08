#[cfg(test)]
mod tests {
    #[test]
    fn successful_test() {
        assert_eq!(1, 1);
    }

    #[test]
    fn failing_test() {
        assert_eq!(1, 2);
    }
}