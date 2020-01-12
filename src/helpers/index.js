export const  isRequired= (data)=>{
    let error;

    Object.keys(data).forEach((key)=>{
      if(!data[key]){
        error = `${key} is required`;
      }

      if(data[key]&&data[key].trim().length<1){
        error = `${key} is required`;
      }
    });
    return error;
  }

export  const resHandler = (res, success, data, statusCode=400)=>{
    const key = success?'data':'error'

    return res.status(statusCode).send({
      success,
      statusCode,
      [key]: data,
    });
  };
