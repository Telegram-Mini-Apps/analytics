use wasm_bindgen::prelude::*;
use std::collections::HashMap;
use rand::Rng;

pub struct EllipticCurve {
    a: f64,
    b: f64,
}

impl EllipticCurve {
    pub fn new(a: f64, b: f64) -> EllipticCurve {
        if 4.0 * a.powi(3) + 27.0 * b.powi(2) == 0.0 {
            panic!("The curve is singular; parameters a and b must satisfy 4a^3 + 27b^2 != 0.");
        }
        EllipticCurve { a, b }
    }

    pub fn is_on_curve(&self, x: f64, y: f64) -> bool {
        y.powi(2) == x.powi(3) + self.a * x + self.b
    }

    pub fn get_random_point(&self) -> JsValue {
        let mut rng = rand::thread_rng();
        let x = rng.gen_range(0..1_000) as f64;
        let y = (x.powi(3) + self.a * x + self.b).sqrt();
        let response = HashMap::from([
            ('x', x),
            ('y', y),
        ]);

        serde_wasm_bindgen::to_value(&response).unwrap()
    }
}

#[wasm_bindgen]
pub fn e12f1e505654847829d9ae61aab7527dd0fd884(a: f64, b: f64) -> JsValue {
    let curve = EllipticCurve {
        a,
        b,
    };

    let solution = curve.get_random_point();

    return solution;
}