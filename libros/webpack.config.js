import path from 'path'
export default{
    mode:'development',
    entry:{
        notify:'./src/js/notify.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve('public/js')

}
}