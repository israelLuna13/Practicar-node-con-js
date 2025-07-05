import path from 'path'
export default{
    mode:'development',
    entry:{
        notify:'./src/js/notify.js',
        deleteBook:'./src/js/deleteBook.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve('public/js')

}
}