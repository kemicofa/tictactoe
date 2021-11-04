import { assertEquals, assertThrows } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import Tictactoe from './tictactoe.ts';
Deno.test('should initiate a new tictactoe game', () => {
    const tictactoe = new Tictactoe();
    assertEquals(tictactoe instanceof Tictactoe, true);
});

Deno.test('should return the initial board', () => {
    const tictactoe = new Tictactoe();
    const snapshot = tictactoe.toString();
    assertEquals(snapshot, 'O:_:_________');
});

Deno.test('should play a position', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(0, 0);
    assertEquals(tictactoe.toString(), 'O:_:X________');
});

Deno.test('should throw an error if a position if out of bounds', () => {
    const tictactoe = new Tictactoe();
    const cases = [
        [-1, 0],
        [3, 0],
        [0, -1],
        [0, 3]
    ];
    cases.forEach(([x, y]) => {
        assertThrows(() => tictactoe.play(x, y), Error, 'Cannot play a position that is out of bounds');
    });
});

Deno.test('should throw if the position has already been played', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(0, 0);
    assertThrows(() => tictactoe.play(0, 0), Error, 'Cannot play a position that has already been played');
});

Deno.test('should alternate between players', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(0, 0);
    tictactoe.play(0, 1);
    assertEquals(tictactoe.toString(), 'O:_:XO_______');
});

Deno.test('should indicate a vertical winner', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(0, 0);
    tictactoe.play(0, 1);
    tictactoe.play(1, 0);
    tictactoe.play(0, 2);
    tictactoe.play(2, 0);
    assertEquals(tictactoe.toString(), 'C:X:XOOX__X__');
});

Deno.test('should indicate a horizontal winner', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(0, 0);
    tictactoe.play(1, 0);
    tictactoe.play(0, 1);
    tictactoe.play(2, 0);
    tictactoe.play(0, 2);
    assertEquals(tictactoe.toString(), 'C:X:XXXO__O__');
});

Deno.test('should indicate a win for O vertical', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(0, 0);
    tictactoe.play(2, 0);
    tictactoe.play(0, 1);
    tictactoe.play(2, 1);
    tictactoe.play(1, 2);
    tictactoe.play(2, 2);
    assertEquals(tictactoe.toString(), 'C:O:XX___XOOO');
});

Deno.test('should indicate a diagonal top left to bottom right win', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(0, 0);
    tictactoe.play(1, 0);
    tictactoe.play(1, 1);
    tictactoe.play(1, 2);
    tictactoe.play(2, 2);
    assertEquals(tictactoe.toString(), 'C:X:X__OXO__X');
});

Deno.test('should indicate a diagonal bottom left to top right win', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(2, 0);
    tictactoe.play(1, 0);
    tictactoe.play(1, 1);
    tictactoe.play(1, 2);
    tictactoe.play(0, 2);
    assertEquals(tictactoe.toString(), 'C:X:__XOXOX__');
});

Deno.test('should not be able to keep playing if the game is done', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(2, 0);
    tictactoe.play(1, 0);
    tictactoe.play(1, 1);
    tictactoe.play(1, 2);
    tictactoe.play(0, 2);
    assertEquals(tictactoe.toString(), 'C:X:__XOXOX__');
    assertThrows(() => tictactoe.play(0, 0), Error, 'Cannot play a game that is done');
});

Deno.test('should indicate a draw if no more plays are possible', () => {
    const tictactoe = new Tictactoe();
    tictactoe.play(0, 0);
    tictactoe.play(1, 1);
    tictactoe.play(2, 2);
    tictactoe.play(1, 0);
    tictactoe.play(1, 2);
    tictactoe.play(0, 2);
    tictactoe.play(0, 1);
    tictactoe.play(2, 1);
    tictactoe.play(2, 0);
    assertEquals(tictactoe.toString(), 'D:_:XXOOOXXOX');
});