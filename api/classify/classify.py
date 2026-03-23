from flask import Flask, jsonify,request
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*"
    }
})

def get_all_files(directory,files_array):
    for file in os.listdir(directory):
        files_array.append(file)
    return files_array,len(files_array)    
@app.route('/api/classify',methods=['POST'])
def process():
    if not request.is_json:
        return jsonify({'status':'not ok','message':'you must probide json data'},400)
    data = request.get_json()
    path=data.get('path')
    if not os.path.exists(path):
        return jsonify({'status':'not ok','message':'your path does not exist'},400)
    all_directories=[]
    for entry in os.scandir(path):
        if entry.is_dir():
            all_directories.append(entry.name)
    files={}        
    for directory in all_directories:
        if directory=='PDF':
            pdf_directory=os.path.join(path,directory)
            pdf_files_res,number_of_pdf_files=get_all_files(pdf_directory,[])
            files['pdf']={'pdf_files':pdf_files_res,'number_of_pdf':number_of_pdf_files}
        elif directory=="DOCX":
            docx_directory=os.path.join(path,directory)
            docx_files_res,number_of_docx_files=get_all_files(docx_directory,[])
            files['docx']={'doxc_files':docx_files_res,'number_docx_pdf':number_of_docx_files}
        elif directory=='PPT':
            ppt_directory=os.path.join(path,directory)
            ppt_files_res,number_of_ppt_files=get_all_files(ppt_directory,[])
            files['ppt']={'ppt_files':ppt_files_res,'number_ppt_pdf':number_of_ppt_files}
        elif directory=='PNG':
            png_directory=os.path.join(path,directory)
            png_images_res,number_of_png_images=get_all_files(png_directory,[])
            files['png']={'png_images':png_images_res,'number_of_png_images':number_of_png_images}
        elif directory=='JPEG':
            jpeg_directory=os.path.join(path,directory)
            jpeg_images_res,number_of_jpeg_images=get_all_files(jpeg_directory,[])
            files['jpeg']={'jpeg_images_res':jpeg_images_res,'number_of_jpeg_images':number_of_jpeg_images}                        
    return jsonify({'data':files},200)                   

if __name__ == '__main__':
    app.run(port=5001,debug=True)