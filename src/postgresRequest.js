const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:12345@localhost:5432/db1");
const Reducers = {};
Reducers.getAllUsers = function(){
    // language=PostgreSQL
    return db.query(`SELECT user_login FROM new_schema.users`)
        .then(
            function (data) {
                return  data
            }
        )
        .catch(function (error) {
            return error
        });
};
Reducers.registerUser = function(user_login,password){
    // language=PostgreSQL
    return db.query(`
        INSERT 
        INTO
            new_schema.users
            (user_id,user_login,password) 
        VALUES
            (DEFAULT,'${user_login}','${password}')
            
            `)
        .then( data=>  user_login )
        .catch( error=> error )
};

Reducers.getPost = function(id){
// language=PostgreSQL
    return db.query(`SELECT * FROM new_schema.post where post_id = '${id}'`)
        .then(
            data => {
            data[0].date = data[0].date.toString();
            return data[0]
            })
        .catch(errors=> errors)
}

Reducers.getPostContent = function(content_id){
    // language=PostgreSQL
    return db.query(`SELECT content FROM new_schema.post_content where ${content_id} = post_content.content_id`)
        .then(data =>{return data}  )
        .catch(errors=> errors)
}

Reducers.addPost = async function({image,header,content,date}) {
    // language=PostgreSQL
    await db.query(
        `INSERT INTO new_schema.post_content(content) VALUES ('${content}')`)

    // language=PostgreSQL
    let b = await db.query(`
        INSERT INTO 
            new_schema.post(header,image,date,user_id,content_id)
             VALUES ('${header}','${image}','${date}','1',(select max(content_id) from new_schema.post_content))
             `)
        .then(data =>data)
        .catch(errors=> console.log(errors) )
    return  {request: !!b }
}

Reducers.getTagsForPost = function(Post_id){
    // language=PostgreSQL
    return db.query(`SELECT
    (SELECT
        new_schema.tags.tag_name
    FROM
        new_schema.tags 
    where
        post_tag.tag_id = tag_id),
       (SELECT
        new_schema.tags.tag_id
    FROM
        new_schema.tags 
    where
        post_tag.tag_id = tag_id)
FROM
    new_schema.post_tag 
where
    ${Post_id} = new_schema.post_tag.post_id`)
        .then(data =>{console.log(data); return  data})
        .catch(errors=> console.log(errors) )
}

Reducers.getPostAll = async function(){
// language=PostgreSQL
    let dat = await db.query(`SELECT * FROM new_schema.post`)
        .then(data => data)
        .catch(errors=> errors)

    for(let i=0; i < dat.length; i++){
        dat[i].date =dat[i].date.toString()
    }
    return dat;
}
Reducers.getAllTags = function(){
    // language=PostgreSQL
    return db.query(
              `SELECT
                         tags.tag_name,
                         tags.tag_id
                     FROM
                         new_schema.tags
                     `)
        .then(data=> data)
        .catch(errors=>errors)
}
Reducers.authorisation = async function(name,password ){
    // language=PostgreSQL
    let result = await db.query(`
        select
            user_login
        from
            new_schema.users
        where
            user_login = '${name}'
          and password = '${password}' 
                                `)
        .then(data=> data)
        .catch(errors=>errors)
    return {request :result[0]? 'true' : 'false' }
    }


module.exports = Reducers;
