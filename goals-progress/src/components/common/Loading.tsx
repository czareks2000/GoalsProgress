interface Props {
  disableContainerStyle?: boolean;
}


const Loading = ({disableContainerStyle}: Props) => {
  const containerStyle = !disableContainerStyle 
    ? 'container-without-border' 
    : '';

  return (
    <div className={`${containerStyle} text-center my-3`}>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading
