import React, {Component, Fragment, useState, useEffect} from 'react';
import {Card} from '../types/Card';
import {StyleSheet, Text} from 'react-native';
import SwipeableCard, {SwipeableCardHooks} from '../core-ui/SwipeableCard';

type Props = {};

type State = {
  cards: Array<Card>;
  isCardExist: boolean;
};

export function SwipeableCardsHooks() {
  let [cards, setCards] = useState([
    {
      id: '1',
      cardTitle: 'Card 1',
      backgroundColor: '#FFC107',
    },
    {
      id: '2',
      cardTitle: 'Card 2',
      backgroundColor: '#ED2525',
    },
    {
      id: '3',
      cardTitle: 'Card 3',
      backgroundColor: '#E70x88E',
    },
    {
      id: '4',
      cardTitle: 'Card 4',
      backgroundColor: '#00BCD4',
    },
    {
      id: '5',
      cardTitle: 'Card 5',
      backgroundColor: '#FFFB14',
    },
  ]);
  let [isCardExist, setIsCardExist] = useState(false);

  useEffect(() => {
    setCards(cards.reverse);
    if (cards.length === 0) {
      setIsCardExist(true);
    }
  });

  let _removeCard = (id: string) => {
    cards.splice(cards.findIndex((x) => x.id === id), 1);

    if (cards.length === 0) {
      setIsCardExist(true);
    }
  };

  return (
    <Fragment>
      {cards.map((item, key) => (
        <SwipeableCardHooks
          key={key}
          item={item}
          removeCard={() => _removeCard(item.id)}
        />
      ))}
      {isCardExist && (
        <Text style={styles.cardNotExistText}>No Cards Found.</Text>
      )}
    </Fragment>
  );
}
export default class SwipeableCards extends Component<Props, State> {
  state = {
    cards: [
      {
        id: '1',
        cardTitle: 'Card 1',
        backgroundColor: '#FFC107',
      },
      {
        id: '2',
        cardTitle: 'Card 2',
        backgroundColor: '#ED2525',
      },
      {
        id: '3',
        cardTitle: 'Card 3',
        backgroundColor: '#E70x88E',
      },
      {
        id: '4',
        cardTitle: 'Card 4',
        backgroundColor: '#00BCD4',
      },
      {
        id: '5',
        cardTitle: 'Card 5',
        backgroundColor: '#FFFB14',
      },
    ],
    isCardExist: false,
  };
  componentDidMount() {
    let {cards} = this.state;

    this.setState({
      cards: cards.reverse(),
    });

    if (cards.length === 0) {
      this.setState({isCardExist: true});
    }
  }

  _removeCard = (id: string) => {
    let {cards} = this.state;
    cards.splice(cards.findIndex((x) => x.id === id), 1);

    this.setState({cards}, () => {
      if (cards.length === 0) {
        this.setState({isCardExist: true});
      }
    });
  };

  render() {
    let {cards, isCardExist} = this.state;
    return (
      <Fragment>
        {cards.map((item, key) => (
          <SwipeableCardHooks
            key={key}
            item={item}
            removeCard={() => this._removeCard(item.id)}
          />
        ))}
        {isCardExist && (
          <Text style={styles.cardNotExistText}>No Cards Found.</Text>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  cardNotExistText: {fontSize: 22, color: '#000'},
});
