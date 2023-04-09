
import { getStorage } from 'firebase-admin/storage';
import { initializeApp, cert } from 'firebase-admin/app';
import dotenv from 'dotenv';

dotenv.config();

initializeApp({
    credential: cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    }),
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET //it is not working
    storageBucket: process.env.FIREBASE_STORAGE_BUCKETT
});

const storage = getStorage().bucket();

export default storage;



/*
//i updated this above code ,now it is working
import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';
// import serviceAccount from '../credential.json';

const BUCKET = "netflixo-2e70f.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(
        {
            "type": "service_account",
            "project_id": "netflixo-2e70f",
            "private_key_id": "0751324223f961a17509be0595f090f12031fcc2",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbe0m15EchYqRF\nPZxZ2w1btC9dAxm3j+fMod4mHMowPQ6vtYm6iEygFoswhzQWobypjo/CDI8q77Un\nMwgvtSaOL4d+a+5sabp2xXRxtvhJq484eMOwFUxPzfUzVKF5rK73V6auSv9qvBKr\nodCSc1MQCeE1irduXeq6NzDjRwGkW7z0d4/joUqRkIfaNKWaiQbahkOpd+UP9hBv\nxzdoIgiIrQprWFkn5ebQOjLk8HWbqOHGWBzYFpNlh0kE7PrAYa5UZEC+PloPQfg7\n09XywWavXYkayYJzJzruJUTvm0UHH5Q4/byPBHaESk1QDHfKy/pEhnE+zNINHpfp\nNYibOsp3AgMBAAECggEAPWhoKGrMnSb0clRvGB4oHHwB6N58nb88cdnMf4kHYh37\nWvJ8Pyvt95xvxO7hZ77hYKZpqN6E/RRHm//Pz+fgHnAvN4MxW6g2eQprfy4gyhf0\nLP2lbDo9NZfGrEtUq1XElPQNZPFCB8nYJel3EyBxQfhk9lyfLfvx5TI/IMS+pUbo\ntXggn/Cw9swu+s978b+r4+Ha/1ufzPgEMiT4VcFiXjJDuP+5HW4/z/QBx5J5xKyq\nB3I6cmuGD01GPYrDBXS3RjIaOg8ZWQBB0Vz/qpnWgbxy+vVZG6sBiLzK8U5pa40j\nFphCeeaPWFa8W1Z8ATM2JPkNd4+RFkjHL9+X2eCggQKBgQDIj1ojnBlwCqc07DLi\nn8hcMeUzr47/HL+57YHHipx1E5dLDQOZctqK9ai4duWefpJ/jZio+s8yFcg2NIWF\nJq1GHWuE/EBuvm8qD6KV2U8BLf1fzvzou+bOYImN2ctRqms64/SGzXw87LHAOtv5\n5i6nL0D5YuZJ8uF77V+mGfNJ0QKBgQDGdfWu0g+KEJKgwaJugRsgb8M2+LJuT7U9\nDLk/ViBqwMx2G8tzbAVVTe4nHkjb3o6LKpUafUi4b8wnKQLZkbdJry8qVFraqNTB\navzSXF6Qv/i90HvlJhnM7TRYWumFC9sXvhPDIEVQlov2uuICTqVmyF9bSi/K3QTr\nACjjATcZxwKBgA66oGcPFrsovSDg29fS3jcPHwMNuJW5ucbgz3AlGNpsRucnHIWP\nbsdXxT1O1gwuxXmCn5yBVugZu2tnrgqaTY1hqbzJfb3kVGulXE5e+DNg+kOoAuDg\ns9GiO1fkj87+kgNwLEweGSqsQ12XtQIESpbSnJX0Em+J289rHmQncbuRAoGAQESc\n3hMqcxRw11w9ZLmsdjGbLycUaUKot29yYf9bGhb7X1ga53LYu0o0UDivcXw9/vU4\nOc7OiOOzYg8W3CwjBdqUVIniriK0WzpxSxIckZWJULa+GHPhMQqzw9UVAD/ZoHOu\nZKcDq1hFVQ4p+INNbt5+esqodXJjkFKJ6xFOrasCgYAHUvpUfUNjyZwX2/ctHvU6\nPIddOzBQCQUSevv7AuW8sUeFi6z9kEXNpxKfQ6F2dKjI0Wrb3X17206Renz6EIDE\nrivVQcP8R1IhbiZKHzKumzOGkT3FnHoQAvBac1iXa5p4ld7B/CKVszbKPuQvk8WU\n4ytTABDRDyxoco39/Y8lFg==\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-jgm2d@netflixo-2e70f.iam.gserviceaccount.com",
            "client_id": "116807943358722450941",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jgm2d%40netflixo-2e70f.iam.gserviceaccount.com"
        }
    ),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const storage = admin.storage().bucket();
export default storage;
*/