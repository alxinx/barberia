


const checkDuplicados = async (Modelo, campo, valor)=>{
    const where = {};
    where[campo] = valor;
    return !!(await Modelo.findOne({ where }));
}


export { checkDuplicados }