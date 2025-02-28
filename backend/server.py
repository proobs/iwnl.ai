from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)
@app.route('/search', methods=['POST'])
def search():
    # Use request.get_json() for JSON payloads
    data = request.get_json()
    search_query = data.get("searchQuery")
    region = data.get("region")
    print("Search Query:", search_query)
    print("Region:", region)
    return jsonify({"message": "Data received"}), 200

if __name__ == '__main__':
    app.run(debug=True)
