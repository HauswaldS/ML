import getDotenv from '../utils/dotenv';
import {Database, aql} from "arangojs";

getDotenv();

const db = new Database();
db.useDatabase(process.env.DB_NAME);
db.useBasicAuth(process.env.DB_USERNAME, process.env.DB_PASSWORD);

export default {
    // ----------- Users -----------
    getUsers({page, limit, searchProp, searchValue, sortProp, sortValue}) {
        return db.query(aql`
            LET totalCount = LENGTH((FOR user in Users
                            FILTER user[${searchProp}] LIKE ${`%${searchValue}%`}
                            RETURN user))  
            LET users = (FOR user in Users
                            FILTER user[${searchProp}] LIKE ${`%${searchValue}%`}
                            SORT user[${sortProp}] ${sortValue === 'descend' ? 'DESC' : 'ASC'}
                            LIMIT ${(page - 1) * limit}, ${+limit}  
                            RETURN MERGE(user, {groups: DOCUMENT("Users_groups", user.groups)}))
            RETURN {
                users,
                totalCount
            }
        `).then(cursor => cursor._result[0])
    },
    getUser(userId) {
        return db.query(aql`
           FOR user IN Users
               FILTER user._key == ${userId} 
               RETURN MERGE(user, {groups: DOCUMENT("Users_groups", user.groups)})
       `).then(cursor => cursor._result[0])
    },
    createUser(payload) {
        return db.query(aql`
            INSERT ${payload} IN Users
            RETURN NEW
       `).then(cursor => this.getUser(cursor._result[0]._key))
    },
    updateUser(payload, userId) {
        return db.query(aql`
           UPDATE ${userId} WITH ${payload} IN Users
       `).then(() => this.getUser(userId))
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
       `).then(cursor => cursor._result)
    },

    // ----------- Datasets -----------

    // getDatasets()
}



