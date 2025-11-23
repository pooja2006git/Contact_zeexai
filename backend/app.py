from flask import Flask
from flask_cors import CORS
from routes.contact import contact_bp

# Create Flask application
app = Flask(__name__)

# Configure CORS to allow requests from Vite dev server
CORS(app, resources={
    r"/contact": {
        "origins": ["http://localhost:5173"],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    }
})

# Register blueprints
app.register_blueprint(contact_bp)

# Health check route
@app.route('/health', methods=['GET'])
def health():
    return {"status": "ok"}, 200


if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)

