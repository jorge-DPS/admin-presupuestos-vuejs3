export const formatQuantity = ( quantity ) => {
    return Number(quantity).toLocaleString('es-BO', {
        style: 'currency',
        currency: 'BOB',
    })
}

export const generarId = () => {
    const date = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)
    console.log(random + date);
    
    return random + date
}

export const formatDate = (date) => {
    const dateNew = new Date(date)
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return dateNew.toLocaleDateString('es-ES', options)
}