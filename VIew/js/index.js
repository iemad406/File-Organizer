document.getElementById('form').addEventListener('submit',async (e)=>{
            e.preventDefault();     
            //check if the input is empty
            let path_value = "";
            if(!checkIsPathEmpty(document.getElementById('path').value)){
                       //Remove space 
                       const pathValueWithoutSpace = document.getElementById('path').value.trim();
                       path_value = pathValueWithoutSpace;
                       const jsonData = JSON.stringify({
                             'path' : path_value      
                       });
                       
                        const res = await originizeFiles('http://localhost:5001/api/originizer',jsonData);
                        if(res[0].status!=='ok'){

                              if(res[0].message==='Request must contain JSON data'){
                                   
                                       document.getElementById('errorMsg').textContent='Request must contain JSON data';
                              }else if(res[0].message==='The path does not exist'){
                                              
                                      document.getElementById('errorMsg').textContent='The path does not exist';
                              }else{
                                  
                                      document.getElementById('errorMsg').textContent =res[0].message;
                              }
                        }else{
                             
                              window.localStorage.setItem('input_path',path_value);
                             document.getElementById('successMsg').textContent='The operation is sucessfull'; 
                             setTimeout(()=>{
                                    
                                         window.location.href='../View/show.html';
                             },5000)
                        }
            }else{
                
                  document.getElementById('errorMsg').textContent='The path input field can not be empty'
            }
});

function checkIsPathEmpty(path_value){
    return path_value.length===0;
}
async function originizeFiles(endPoint,data){
      try{
          
          const responseData = await fetch(endPoint,{
                  method : "POST" ,
                  headers : {
                      
                       "Content-Type" : "application/json"
                  } ,
                  
                  body : data
          });
          
          return await responseData.json();

      }catch(err){

          console.error(err);
      }
}