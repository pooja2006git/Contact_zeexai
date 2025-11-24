"""
Flask application entry point
"""
from flask import Flask, send_from_directory
from flask_cors import CORS
from pathlib import Path
from config import Config
from models import db
from routes import applications_bp

def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    
    # Configure CORS
    CORS(app, 
         origins=app.config['CORS_ORIGINS'],
         supports_credentials=True)
    
    # Register blueprints
    app.register_blueprint(applications_bp, url_prefix='/api')
    
    # Serve media files (matching Django's MEDIA_URL)
    @app.route('/media/<path:filename>')
    def media_files(filename):
        """Serve media files"""
        return send_from_directory(
            app.config['MEDIA_ROOT'],
            filename
        )
    
    # Create tables if they don't exist
    with app.app_context():
        db.create_all()
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='127.0.0.1', port=8000)

