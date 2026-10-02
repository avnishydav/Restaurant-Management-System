from flask import Flask,request,jsonify
from datetime import datetime
import json

app=Flask(__name__)

@app.route("/order",methods=["POST"])
def order():
    data=request.json
    data["time"]=str(datetime.now())

    with open("orders.json","a") as f:
        f.write(json.dumps(data)+"\n")

    return "ok"

@app.route("/orders")
def orders():
    arr=[]
    try:
        with open("orders.json") as f:
            for line in f:
                arr.append(json.loads(line))
    except:
        pass
    return jsonify(arr)

app.run(debug=True)