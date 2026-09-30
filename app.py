from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/builder")
def builder():
    return render_template("builder.html")

@app.route("/resume", methods=["POST"])
def resume():
    data = request.get_json()
    return render_template("resume.html", data=data)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
