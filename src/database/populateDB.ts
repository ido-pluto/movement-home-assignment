import AccountModel from './collection/account.js';

const INSERT_PAGES = 10;

async function fetchPageFromReqres(id: number) {
    const response = await fetch(`https://reqres.in/api/users?page=${id}`);
    return await response.json();
}

async function insertPageToDB(id: number) {
    const page = await fetchPageFromReqres(id);
    const mapToAccount = page.data.map((user: any) => ({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.avatar,
    }));

    return await AccountModel.insertMany(mapToAccount);
}

export async function insertIfDBEmpty() {
    const count = await AccountModel.countDocuments();
    if (count > 0) {
        return;
    }

    const promises = [];
    for (let i = 0; i < INSERT_PAGES; i++) {
        promises.push(insertPageToDB(i + 1));
    }

    const allCounts = await Promise.all(promises);
    const sumCounts = allCounts.reduce((acc, cur) => acc + cur.length, 0);
    console.log(`Inserted ${sumCounts} users`);
}
