const Input =(props)=>{
     return(
        <input  type={props.type} className={props.className} value={props.value} onChange={props.handleChange} id={props.id} name={props.name} min={props.min} max={props.max} list={props.list}></input>
     )
}
export default Input;