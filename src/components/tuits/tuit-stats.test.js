import {act, create} from 'react-test-renderer';
import TuitStats from "./tuit-stats";

test('stats render correctly', () => {
  let stats = {
    likes: 123,
    replies: 234,
    retuits: 345
  }
  
  const likeTuit = () => {
    act(() => {
      stats.likes++;
      tuitStats.update(
        <TuitStats
          tuit={{stats: stats}}
          likeTuit={() => {}}
        />)
    })
  }
  
  let tuitStats
  act(() => {
    tuitStats = create(
      <TuitStats
        likeTuit={likeTuit}
        tuit={{stats: stats}}/>
    );
  })
  
  const root = tuitStats.root;
  const likesCounter = root.findByProps({className: 'ttr-stats-likes'})
  const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
  const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
  const likeTuitButton = root.findByProps(
    {className: 'ttr-like-tuit-click'})

  let likesText = likesCounter.children[0];
  const repliesText = repliesCounter.children[0];
  const retuitsText = retuitsCounter.children[0];
  expect(likesText).toBe('123');
  expect(repliesText).toBe('234');
  expect(retuitsText).toBe('345');
  
  act(() => {likeTuitButton.props.onClick()})
  likesText = likesCounter.children[0];
  expect(likesText).toBe('124');
});

test('stats render correctly unlike', () => {
  let stats = {
    likes: 123,
    replies: 234,
    retuits: 345,
    unlikes: 1234
  }

  const unlikeTuit = () => {
    act(() => {
      stats.unlikes++;
      tuitStats.update(
          <TuitStats
              tuit={{stats: stats}}
              unlikeTuit={() => {}}
          />)
    })
  }

  let tuitStats
  act(() => {
    tuitStats = create(
        <TuitStats
            unlikeTuit={unlikeTuit}
            tuit={{stats: stats}}/>
    );
  })

  const root = tuitStats.root;
  const unlikesCounter = root.findByProps({className: 'ttr-stats-unlikes'})
  const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
  const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
  const unlikeTuitButton = root.findByProps(
      {className: 'ttr-unlike-tuit-click'})

  let unlikesText = unlikesCounter.children[0];
  const repliesText = repliesCounter.children[0];
  const retuitsText = retuitsCounter.children[0];
  expect(unlikesText).toBe('1234');
  expect(repliesText).toBe('234');
  expect(retuitsText).toBe('345');

  act(() => {unlikeTuitButton.props.onClick()})
  unlikesText = unlikesCounter.children[0];
  expect(unlikesText).toBe('1235');
});