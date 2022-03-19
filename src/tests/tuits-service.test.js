import {
    createTuit,
    deleteTuit, findTuitById,
    findAllTuits,
} from "../services/tuits-service";

import {
    createUser, deleteUsersByUsername
} from "../services/users-service";

describe('createTuit',  () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };


    const tuitRipley = {
        tuit: 'Hi Ripley',
    };

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(ripley.username);
    })

    test('can create tuit with REST API', async () => {
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, tuitRipley);
        expect(newTuit.tuit).toEqual(tuitRipley.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

    })
});
describe('can delete tuit wtih REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const tuitRipley = {
        tuit: 'Hi Ripley',
    };

    // setup test before running test
    beforeAll(async () => {
        // insert the sample user we then try to remove
        //const newUser = await createUser(ripley);
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(ripley.username);
    })
    test('can delete tuit wtih REST API',async() => {
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, tuitRipley);
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const tuitRipley = {
        tuit: 'Hi Ripley',
    };

    // setup test before running test
    beforeAll(async () => {
        // insert the sample user we then try to remove
        //const newUser = await createUser(ripley);
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(ripley.username);
    })
    test('can retrieve a tuit by their primary key with REST API',async() => {
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, tuitRipley);

        expect(newTuit.tuit).toEqual(tuitRipley.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        const existingTuit = await findTuitById(newTuit._id);

        expect(existingTuit.tuit).toEqual(tuitRipley.tuit);
        expect(existingTuit.postedBy._id).toEqual(newUser._id)
    })
});

describe('can retrieve all tuits with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const tuits= [
        {
            tuit : "Hello1"
        },
        {
            tuit : "Hello2"
        },
        {
            tuit : "Hello3"
        },
    ]

    beforeAll(async () => {
 //       await Promise.all(tuits.map(async (tuit) => await deleteTuit(tuit._id)));
        return deleteUsersByUsername(ripley.username);
    })

    afterAll(async () => {
        //await Promise.all(tuits.map(async (tuit) => await deleteTuit(tuit._id)));
        return deleteUsersByUsername(ripley.username);
    })

    test('can retrieve all tuits with REST API',async() => {
        const newUser = await createUser(ripley);
        tuits.map(tuit =>
        createTuit(
            newUser._id,
            tuit
        ))

        const tuit1 = await findAllTuits();
        expect(tuit1.length).toBeGreaterThanOrEqual(tuits.length);


        const tuitWeInserted = tuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);

        tuitWeInserted.forEach(tuit1 => {
            const tuit =  tuits.find(tuit => tuit === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitWeInserted);
            expect(tuit.postedBy).toEqual(tuitWeInserted);
        })
    })
});