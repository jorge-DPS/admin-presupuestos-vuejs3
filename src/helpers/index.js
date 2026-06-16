export const formatQuantity = ( quantity ) => {
    return Number(quantity).toLocaleString('es-BO', {
        style: 'currency',
        currency: 'BOB',
    })
}