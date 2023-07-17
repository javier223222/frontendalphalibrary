const Button=(props)=>{
    return(
      <button type={props.type} className={props.class} onClick={props.handleSubmit}  ></button>
    )

}
export default Button