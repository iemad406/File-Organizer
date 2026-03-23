document.addEventListener('DOMContentLoaded',async ()=>{

        if(window.localStorage.getItem('input_path')!==null){

                 const path_value=window.localStorage.getItem('input_path');
                 try{
                    
                        const fetchResponce = await fetch('http://localhost:5001/api/classify',{
                            method:"POST",
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({path:path_value})
                        });
                        const data = await fetchResponce.json();
                        const directory_names=Object.keys(data[0].data);
                                               
                        const container=document.createElement('div');
                        container.className='container';
                        const card=document.createElement('div');
                        card.className='card';
                        directory_names.map((curr_directory)=>{
                               const card_header=document.createElement('div');
                               card_header.className='card-header';
                               const h2=document.createElement('h2');
                               h2.textContent=curr_directory;
                               card_header.appendChild(h2);
                            if(curr_directory=='pdf'){
                                const pdf_info=data[0].data[curr_directory];
                                for(const [key,value] of Object.entries(pdf_info)){
                                        console.log(key);
                                       if(typeof(value)!=='object'){
                                                const file_count=document.createElement('span');
                                                file_count.className='file-count';
                                                file_count.textContent=`number of pdf files:${value}`;
                                                card_header.appendChild(file_count);
                                       }else{
                                           const ul=document.createElement('ul');
                                           value.map((file)=>{
                                                  
                                                    const li=document.createElement('li');
                                                    li.textContent=`${file}`;
                                                    ul.appendChild(li); 
                                           });
                                           card.appendChild(card_header); 
                                           card.appendChild(ul);
                                       }
                                }
                            }else if(curr_directory=='ppt'){
                                const ppt_info=data[0].data[curr_directory];
                                for(const [key,value] of Object.entries(ppt_info)){
                                        console.log(key);
                                       if(typeof(value)!=='object'){
                                                const file_count=document.createElement('span');
                                                file_count.className='file-count';
                                                file_count.textContent=`number of ppt files is:${value}`;
                                                card_header.appendChild(file_count);
                                       }else{
                                           const ul=document.createElement('ul');
                                           value.map((file)=>{
                                                  
                                                    const li=document.createElement('li');
                                                    li.textContent=`${file}`;
                                                    ul.appendChild(li); 
                                           });
                                           card.appendChild(card_header);
                                           card.appendChild(ul);
                                       }
                                }
                            }else if(curr_directory=='docx'){
                                const docx_info=data[0].data[curr_directory];
                                for(const [key,value] of Object.entries(docx_info)){
                                          
                                          if(typeof(value)!=='object'){
                                              
                                                 const file_count=document.createElement('span');
                                                file_count.className='file-count';
                                                file_count.textContent=`number of ppt files is:${value}`;
                                                card_header.appendChild(file_count);
                                          }else{

                                               const ul=document.createElement('ul');
                                           value.map((file)=>{
                                                  
                                                    const li=document.createElement('li');
                                                    li.textContent=`${file}`;
                                                    ul.appendChild(li); 
                                           });
                                           card.appendChild(card_header);
                                           card.appendChild(ul);
                                          }
                                }
                            }else if(curr_directory=='png'){
                                  
                                   const png_images_info=data[0].data[curr_directory];
                                for(const [key,value] of Object.entries(png_images_info)){
                                      
                                       if(typeof(value)!=='object'){
                                              
                                                 const file_count=document.createElement('span');
                                                file_count.className='file-count';
                                                file_count.textContent=`number of ppt files is:${value}`;
                                                card_header.appendChild(file_count);
                                          }else{

                                               const ul=document.createElement('ul');
                                           value.map((file)=>{
                                                  
                                                    const li=document.createElement('li');
                                                    li.textContent=`${file}`;
                                                    ul.appendChild(li); 
                                           });
                                           card.appendChild(card_header);
                                           card.appendChild(ul);
                                          }   
                                }
                            }else if(curr_directory==='jpeg'){
                                const jpeg_images_info=data[0].data[curr_directory];
                                for(const [key,value] of Object.entries(jpeg_images_info)){
                                      
                                       if(typeof(value)!=='object'){
                                              
                                                 const file_count=document.createElement('span');
                                                file_count.className='file-count';
                                                file_count.textContent=`number of ppt files is:${value}`;
                                                card_header.appendChild(file_count);
                                          }else{

                                               const ul=document.createElement('ul');
                                           value.map((file)=>{
                                                  
                                                    const li=document.createElement('li');
                                                    li.textContent=`${file}`;
                                                    ul.appendChild(li); 
                                           });
                                           card.appendChild(card_header);
                                           card.appendChild(ul);
                                          }   
                                }
                            }
                        });
                        container.appendChild(card);
                        document.body.appendChild(container);

                 }catch(err){
                    console.error(err);
                 }
        }else{
            window.history.back();
        }
})