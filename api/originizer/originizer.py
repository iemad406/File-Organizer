from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import mimetypes
import shutil as sh

app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": "*"
    }
})

def create_directory(base_path, folder_name):
    full_path = os.path.join(base_path, folder_name)
    os.makedirs(full_path, exist_ok=True)
    return full_path

def move_file(file, folder):
    sh.move(file, os.path.join(folder, os.path.basename(file)))

@app.route('/api/originizer', methods=['POST'])
def classify_files_and_organize():

    if not request.is_json:
        return jsonify({
            'status': 'not ok',
            'message': 'Request must contain JSON data'
        }), 400

    data = request.get_json()
    path = data.get('path')

    if not path or not os.path.exists(path):
        return jsonify({
            'status': 'not ok',
            'message': 'The path does not exist'
        }), 400

    try:
        
        allowed_typs={
            'documents' : ['pdf','vnd.openxmlformats-officedocument.wordprocessingml.document','vnd.openxmlformats-officedocument.presentationml.presentation'] , 
            'images' : ['png','jpeg']
        }

        for file in os.listdir(path):
            full_path = os.path.join(path, file)

            if os.path.isfile(full_path):
                mime_type = mimetypes.guess_type(full_path)
                file_type = mime_type[0].split('/')[1]
                if file_type in allowed_typs['documents']:
                    if file_type=='pdf':
                        pdf_directory=create_directory(path,'PDF')
                        move_file(full_path,pdf_directory)
                    elif file_type=='vnd.openxmlformats-officedocument.wordprocessingml.document':
                        docx_directory=create_directory(path,'DOCX')
                        move_file(full_path,docx_directory)
                    elif file_type=='vnd.openxmlformats-officedocument.presentationml.presentation':
                        ppt_directory=create_directory(path,'PPT')
                        move_file(full_path, ppt_directory)
                elif file_type in allowed_typs['images']:
                    if file_type=='png':
                        png_directory=create_directory(path,'PNG')
                        move_file(full_path,png_directory)
                    elif file_type=='jpeg':
                        jpeg_directory=create_directory(path,'JPEG')
                        move_file(full_path,jpeg_directory)                    
        return jsonify({'status': 'ok','message':'The operation is completed successfully'},200)

    except Exception as e:
        return jsonify({
            'status': 'not ok',
            'message': str(e)
        }), 500


if __name__ == '__main__':
    app.run(port=5001, debug=True)