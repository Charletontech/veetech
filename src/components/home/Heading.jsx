const Heading = ({title}) => {
    return (
      <div className="headerBg" style={title === 'Post Event'? {marginLeft: '50px'} : {margin: '0px'}}>
        <div className="headerContent">
            <p>{title}</p>
        </div>
      </div>
    )
  }

export default Heading
