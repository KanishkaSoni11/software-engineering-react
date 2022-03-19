import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
    {username: 'alice', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'bob', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

const MOCKED_TUITS = [
    {tuit: "Hi Alice", postedBy : MOCKED_USERS[0], _id: "1" },
    {tuit: "Bob Hi", postedBy : MOCKED_USERS[1], _id: "2" },
];

test('tuit list renders static tuit array', async () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/Hi Alice/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const  tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/kan/i);
    expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() => Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const user = screen.getByText(/Hi Alice/i);
    expect(user).toBeInTheDocument();

    mock.mockRestore();
});
