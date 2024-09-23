use wasm_bindgen::prelude::*;
use serde::Serialize;
use rand::Rng;

#[derive(Serialize)]
pub struct Point {
    x: f64,
    y: f64,
}
pub struct EllipticCurve {
    a: f64,
    b: f64,
}

impl EllipticCurve {
    pub fn new(a: f64, b: f64) -> Self  {
        if 4.0 * a * a * a + 27.0 * b * b == 0.0 {
            panic!("The curve is singular; parameters a and b must satisfy 4a^3 + 27b^2 != 0.");
        }
        Self { a, b }
    }

    pub fn is_on_curve(&self, x: f64, y: f64) -> bool {
        let left = y * y;
        let right = x * x * x + self.a * x + self.b;
        (left - right).abs() < f64::EPSILON
    }

    pub fn get_random_point(&self) -> JsValue {
        let mut rng = rand::thread_rng();
        let x = rng.gen_range(0.0..1000.0);
        let y_squared = x * x * x + self.a * x + self.b;
        let y = y_squared.sqrt();
        let point = Point { x, y };

        serde_wasm_bindgen::to_value(&point).unwrap()
    }
}

#[wasm_bindgen]
pub fn e12f1e505654847829d9ae61aab7527dd0fd884(a: f64, b: f64) -> JsValue {
    let curve = EllipticCurve::new(a, b);
    curve.get_random_point()
}