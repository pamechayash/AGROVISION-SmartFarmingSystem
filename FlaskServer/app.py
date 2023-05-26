from crypt import methods
import os
import numpy as np
from flask_cors import CORS
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from PIL import Image
import pickle




app = Flask(__name__)

app.config['CORS_ALLOW_ORIGINS'] = ['http://localhost:3000']
app.config['CORS_ALLOW_METHODS'] = ['GET', 'POST']
CORS(app)
# Load the Keras model

model = load_model('model-Copy1.h5')
# @app.route('/')
# def home():
#     return render_template('post.html')


# Define a function to preprocess the image
def preprocess_image(image):
    image = image.resize((224, 224))
    image_array = np.array(image)
    image_array = np.expand_dims(image_array, axis=0)
    return image_array


@app.route('/predict', methods=['POST','GET'])
def predict():
    if request.method == 'POST':
        if 'image' in request.files:
            image_file = request.files['image']
        # Get the file from the request
        # file = request.files['file']

        # Open the file as a PIL image
        image = Image.open(image_file)

        # Preprocess the image for prediction
        image_array = preprocess_image(image)

        # Make a prediction using the model
        prediction = model.predict(image_array)
        class_names = ['Apple___Apple_scab',
 'Apple___Black_rot',
 'Apple___Cedar_apple_rust',
 'Apple___healthy',
 'Blueberry___healthy',
 'Cherry_(including_sour)___Powdery_mildew',
 'Cherry_(including_sour)___healthy',
 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
 'Corn_(maize)___Common_rust_',
 'Corn_(maize)___Northern_Leaf_Blight',
 'Corn_(maize)___healthy',
 'Grape___Black_rot',
 'Grape___Esca_(Black_Measles)',
 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
 'Grape___healthy',
 'Orange___Haunglongbing_(Citrus_greening)',
 'Peach___Bacterial_spot',
 'Peach___healthy',
 'Pepper,_bell___Bacterial_spot',
 'Pepper,_bell___healthy',
 'Potato___Early_blight',
 'Potato___Late_blight',
 'Potato___healthy',
 'Raspberry___healthy',
 'Soybean___healthy',
 'Squash___Powdery_mildew',
 'Strawberry___Leaf_scorch',
 'Strawberry___healthy',
 'Tomato___Bacterial_spot',
 'Tomato___Early_blight',
 'Tomato___Late_blight',
 'Tomato___Leaf_Mold',
 'Tomato___Septoria_leaf_spot',
 'Tomato___Spider_mites Two-spotted_spider_mite',
 'Tomato___Target_Spot',
 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
 'Tomato___Tomato_mosaic_virus',
 'Tomato___healthy']
        # Get the predicted class label
        predicted_class = class_names[np.argmax(prediction)]
        print(predicted_class)
        jsonify({'class': predicted_class})
        return {"dis":predicted_class}

app.config['CORS_ORIGINS'] = ['http://localhost:3000']
@app.route("/fertiliser",methods=["GET","POST"])
def hii():    

    data = request.json
    print(data)
    # n=data.get("N")
    n = data['N']
    p = data['P']
    k = data['K']
    temperature = data['TEMPERATURE']
    humidity = data['HUMIDITY']
    moisture = data['MOISTURE']
    soil_type = data['SOILTYPE']
    crop_type = data['CROPTYPE']
    with open('classifier.pkl', 'rb') as f:
        Cl_Model = pickle.load(f)
 
    print(crop_type)
    croptype= {'Barley': 0, 'Cotton': 1, 'Ground Nuts': 2, 'Maize':3 , 'Millets':4, 'Oil seeds':5, 'Paddy':6, 'Pulses':7, 'Sugarcane':8, 'Tobacco':9, 'Wheat':10}
    soiltype={'Black':0, 'Clayey':1, 'Loamy':2, 'Red':3, 'Sandy':4}
    predictions = Cl_Model.predict([[temperature,humidity,moisture,soiltype[soil_type],croptype[crop_type],n,k,p]])   
    print(predictions) 
    ans=predictions[0]
    
    print(ans)
     

    return {"ans":ans}

@app.route("/crop",methods=["GET","POST"])
def hello():
    data = request.json

    n = data['N']
    p = data['P']
    k = data['K']
    temperature = data['TEMPERATURE']
    humidity = data['HUMIDITY']
    ph = data['PH']
    rainfall = data['RAINFALL']
    with open('RandomForest.pkl', 'rb') as f:
        RF_Model = pickle.load(f)
    predictions = RF_Model.predict([[n,p,k,temperature,humidity,ph,rainfall]])   
    print(predictions) 
    ans=predictions[0]
    return ans

@app.route('/helo',methods=["GET","POST"])
def helo():
    return "hello"




if __name__ == '__main__':
    app.run(debug=True)

