import {act, create} from 'react-test-renderer';
import TuitStats from "../../components/tuits/tuit-stats";

test('stats render correctly', () => {
    let stats = {
        likes: 123, replies: 234, retuits: 345, unlikes: 125
    }
    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                likeTuit={() => {
                }} tuit={{stats: stats}}/>
        )
    })

    const root = tuitStats.root;
    const unlikesCounter = root.findByProps(
        {className: 'ttr-stats-unlikes'})
    const retuitsCounter = root.findByProps(
        {className: 'ttr-stats-retuits'})
    const repliesCounter = root.findByProps(
        {className: 'ttr-stats-replies'})
    const likeTuitButton = root.findByProps(
        {className: 'ttr-like-tuit-click'})
    let unlikesText = unlikesCounter.children[0];
    const repliesText = repliesCounter.children[0];
    const retuitsText = retuitsCounter.children[0];
    expect(unlikesText).toBe('125');
    expect(repliesText).toBe('234');
    expect(retuitsText).toBe('345');
})



