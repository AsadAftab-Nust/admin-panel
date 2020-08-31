const ip = "192.168.1.2"
// export default  {
   
//     getPosts:`https://insta-rn.herokuapp.com/user/get-posts-forAdmin`,
// deletePost:`https://insta-rn.herokuapp.com/user/post`,
//     changeStatus:`https://insta-rn.herokuapp.com/admin/change-post-status`,
//     changePostStatus:`https://insta-rn.herokuapp.com/admin/change-any-post-status`,
//     loginAdmin:`https://insta-rn.herokuapp.com/admin/login`,
//     registerAdmin:`https://insta-rn.herokuapp.com/admin/register`,
// getAllUsers:`https://insta-rn.herokuapp.com/user/get-all-users`,
// sendNotification:`https://insta-rn.herokuapp.com/admin/send-notification`,
// sendNotificationToAll:`https://insta-rn.herokuapp.com/admin/send-notification-to-all-users`,
//     getImage:`https://insta-rn.herokuapp.com/image`,
//     getAllPosts:`https://insta-rn.herokuapp.com/user/get-all-posts-forAdmin`,
// editPost:`https://insta-rn.herokuapp.com/admin/edit-post`,
// changeAbility:`https://insta-rn.herokuapp.com/user/change-ability`
            
// }

export default  {
   
    getPosts:`http://${ip}:8080/user/get-posts-forAdmin`,
    deletePost:`http://${ip}:8080/user/post`,
    getAllPosts:`http://${ip}:8080/user/get-all-posts-forAdmin`,
    changeStatus:`http://${ip}:8080/admin/change-post-status`,
    changePostStatus:`http://${ip}:8080/admin/change-any-post-status`,
    loginAdmin:`http://${ip}:8080/admin/login`,
    registerAdmin:`http://${ip}:8080/admin/register`,
    getAllUsers:`http://${ip}:8080/user/get-all-users`,
    sendNotification:`http://${ip}:8080/admin/send-notification`,
    sendNotificationToAll:`http://${ip}:8080/admin/send-notification-to-all-users`,
    changeAbility:`http://${ip}:8080/user/change-ability`,
    editPost:`http://${ip}:8080/admin/edit-post`,
    getImage:`http://${ip}:8080/image`
            
}