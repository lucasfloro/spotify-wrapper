import chai, { expect } from 'chai'; //
import sinon from 'sinon'; // sinon é o que trabalha com promises
import sinonChai from 'sinon-chai'; // serve para integrar sinon com o chai
import sinonStubPromise from 'sinon-stub-promise'; // serve para trabalhar com a promise

chai.use(sinonChai); // utilizar os 'asserts' da interface do sinon-chai
sinonStubPromise(sinon); // receber todos os objetos do sinon
global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchPlaylists, searchTracks } from '../src/main.js';

describe('Spotify Wrapper', () => {
  describe('smoke tests', () => {
    // search (genérico) - + um tipo
    // searchAlbums
    // searchArtists
    // searchTracks
    // searchPlaylists
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch funtion', () => {
      const artists = search();
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album')
      });
    });
  });
});
