import {StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert} from 'react-native';
import React from "react";

const { width } = Dimensions.get('window');
const CELL_SIZE = width / 3 - 20;


type State = {
  game: string,
  nextPlay: string,
}

type Props = {

}

export default class App extends React.Component<Props, State>{
  private validaX = /(..X..X..X)|(.X..X..X.)|(X..X..X..)|(XXX......)|(...XXX...)|(......XXX)|(..X.X.X..)|(X...X...X)/
  private validaBolinha = /(..O..O..O)|(.O..O..O.)|(O..O..O..)|(OOO......)|(...OOO...)|(......OOO)|(..O.O.O..)|(O...O...O)/
  constructor(props: Props) {
    super(props);
    this.state = {
      nextPlay: 'X',
      game: [...new Array(9)].map(() => '_').join('')
    }
  }

  resetState() {
    this.setState({
      game: [...new Array(9)].map(() => '_').join(''),
      nextPlay: 'X',
    });
  }

  handleButton(position: number) {
    if (this.state.game.charAt(position) !== '_') return;
    this.setState({
      game: this.state.game.substring(0, position) + this.state.nextPlay + this.state.game.substring(position + 1, 9),
      nextPlay: this.state.nextPlay === 'X' ? 'O' : 'X',
    });
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.state.game.match(this.validaX)) {
      Alert.alert('Fim do jogo', 'X Ganhou');
      this.resetState();
      return;
    }

    if (this.state.game.match(this.validaBolinha)) {
      Alert.alert('Fim do jogo', 'O Ganhou');
      this.resetState();
      return;
    }

    if (!this.state.game.includes('_')) {
      Alert.alert('Fim do jogo', 'Deu velha!');
      this.resetState();
      return;
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Jogo da Jelha do Caio</Text>
          {[...Array(3)].map((_, row) => (
              <View key={row} style={styles.row}>
                {[...Array(3)].map((_, col) => (
                    <TouchableOpacity key={col} style={styles.cell} onPress={() => {
                      this.handleButton(row * 3 + col)
                    }}>
                      <Text>{this.state.game[row * 3 + col]}</Text>
                    </TouchableOpacity>
                ))}
              </View>
          ))}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
