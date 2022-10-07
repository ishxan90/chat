import { useState, useRef } from "react";
import Img from "../../img";
import { MdDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import './Chat.css';


function Chat() {

    const [data, setData] = useState([])
    const [user, setUser] = useState('me')
    const [img, setImg] = useState(Img.user1)
    const formRef = useRef(null)
    const [edit, setEdit] = useState(null)
 
    const addElement = (e) =>{
        e.preventDefault()
        if(formRef.current[0].value){
            if(!edit){   
                setData([
                    ...data,
                    {
                        id: new Date().getTime().toString(),
                        user: user,
                        title: formRef.current[0].value,
                        isDel: false,
                        img: img
                    }
                ])

                setUser(user === 'me'? 'you' : 'me')
                setImg(img === Img.user1 ? Img.user2 : Img.user1)
                
                formRef.current[0].value = ''
            }else{
                setData([
                    ...data.map(el =>{
                        if(el.id === edit.id){
                            return{
                                ...el,
                                title: formRef.current[0].value,
                            }
                        }
                        return el
                    })
                ])
                setEdit(null)
            }     
        }
    }

    const deleteMessage = (id) => {
        let delMes = 'Deleted Message'
        setData(
            [
                ...data.map(element => {
                    if(element.id === id){
                        return({
                            ...element,
                            title: delMes,
                            isDel: true
                        })
                    }
                    return element
                })
            ]
        )   
    }

    const editItem = (el) => { 
        setEdit(el) 
        formRef.current[0].value = el.title
        formRef.current[0].focus()
    }
      
    return(
        <div className="container">
            <div className="header">     
                <div>
                    <h1>User</h1>
                </div>  
            </div>
            <div className="body">
                {data.map((el) => 
                    <div className={el.user + 'me'} key={el.id}>
                        <img src={el.img} alt="" className={el.user + 'img'} />
                        <h2 className={el.user}>
                            <p>{el.title}</p>
                        {
                        !el.isDel && 
                        <div className="iCons">
                            <div className="delet" 
                                    onClick={() => deleteMessage(el.id)}>
                                        <MdDelete/>            
                            </div>
                            <div className="edit" 
                                    onClick={() => editItem(el)}> 
                                         <RiEdit2Fill/>
                            </div>
                        </div>
                        }
                        </h2>
                    </div>     
                    )
                } 
            </div>

            <div className="footer">
                <form ref={formRef} onSubmit={(e) => {
                    addElement(e, formRef.current[0].value)
                    formRef.current[0].value = ''
                }}>
                    <input type="text"/>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat

