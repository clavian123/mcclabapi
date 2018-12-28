function get_user_course(){
    var usercourses = $.ajax({
        type:'POST',
        url: '/user_courses',
        data: {
            userid: 1
        }
    })

    usercourses.done(function(results){
        console.log(results);
    })
}

function get_detail(){
    var detail = $.ajax({
        url:'/detail_courses',
        type: 'POST',
        data: {
            course_id: 1
        }
    })

    detail.done(function (results){
        console.log(results)
    })
}

function assign_course(){
    var assign = $.ajax({
        url:'/assign_course',
        type: 'POST',
        data: {
            user_id: 1,
            course_id: 2
        }
    })
    assign.done(function (results){
        console.log(results)
    })
}
$(function(){
    get_user_course();
    // get_detail();
    // assign_course();
})