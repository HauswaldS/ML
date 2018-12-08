import getDotenv from '../utils/dotenv';
import {Database, aql} from "arangojs";

getDotenv();

const db = new Database();
db.useDatabase(process.env.DB_NAME);
db.useBasicAuth(process.env.DB_USERNAME, process.env.DB_PASSWORD);

export default {
    getUsers({page, limit, searchProp, searchValue}) {
        console.log(page, limit, searchProp, searchValue)
        return db.query(aql`
            LET userCount = LENGTH(Users)  
            LET users = (FOR user in Users
                            LIMIT ${(page - 1) * limit}, ${limit * 2}
                            FILTER user[${searchProp}] == ${searchValue}
                            RETURN user)
            RETURN {
                users,
                userCount
            }
        `).then(cursor => cursor._result)
    },
    getUser(userId) {
        return db.query(aql`
           FOR user IN Users
               FILTER user._key == ${userId} 
               RETURN MERGE(user, {groups: DOCUMENT("Users_groups", user.groups)})
       `).then(cursor => {
            console.log(cursor)
            return cursor._result[0]
        })
    },
    createUser(payload) {
        return db.query(aql`
            INSERT ${payload} IN Users
            RETURN NEW
       `).then(cursor => cursor._result[0])
    },
    updateUser(payload, userId) {
        return db.query(aql`
           UPDATE ${userId} WITH ${payload}
           IN Users
           RETURN NEW
       `).then(cursor => cursor._result[0])
    },
    deleteUser(userId) {
        return db.query(aql`
            REMOVE ${userId} IN Users
       `);
    },
    getUsersGroups() {
        return db.query(aql`
            FOR userGroup IN Users_groups
                RETURN userGroup
       `).then(cursor => {
            console.log('cursor', cursor)
            return cursor._result
        })
    }
}



