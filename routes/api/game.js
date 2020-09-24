const express = require('express');
const router = express.Router();
var request = require('request');

const Game = require('../../models/Game');

// @route   GET api/game/search
// @desc    Get top 10 search results for product query
// @access  Public
router.get('/search', async(req, res) => {
    try {
        const { name } = req.query;
        if(!name) {
            return res.status(400).json({msg: 'no search term'});
        }
        else
        {
            const game = await Game.find( { name:  {$regex: name, $options: 'i'} } ).limit(10);
            if (!game){
                return res.status(400).json({msg: 'could not find game'});
            }

            res.json(game);
        }
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
        //update app database with new games
        /*var url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/?';
        //http://store.steampowered.com/api/appdetails/?appids=730&cc=EE&l=english&v=1
        request(url, async function(err, response, body) {
            if(!err && response.statusCode < 400) {
                try {
                    steamGameList = JSON.parse(body).applist;
                    let gameObj = {};

                    for (i = 0; i < steamGameList.apps.length; i++) {
                            const newGame = new Game({
                                appid: steamGameList.apps[i].appid,
                                name: steamGameList.apps[i].name
                            });
                
                            gameObj = await Game.findOne({appid: steamGameList.apps[i].appid});
                
                            if(gameObj == null || gameObj == {}) {
                                const game = await newGame.save();
                                gameObj = {};
                                console.log(2);
                            }
                    }*/
                    
                    /*steamGameList.apps.foreach(game => {
                        const newGame = new Game({
                            appid: game.appid,
                            name: game.name
                        });
            
                        let gameObj = await Game.findOne({appid: steamGameList[i].appid});
            
                        if(gameObj.isEmpty()) {
                            const game = await newGame.save();
                            gameObj = {};
                        }
                    });*/
        
              /*      console.log(1);
                } catch(err) {
                    console.error(err.message);
                    res.status(500).send('Server Error');
                }
        
                res.send(steamGameList.apps[0]);
            }
        });	*/
});

// @route   GET api/game
// @desc    Get product data
// @access  Public
router.get('/', async(req, res) => {
    try {
        const { appid } = req.query;
        if(!appid)
        {
            return res.status(400).json({msg: 'No appid provided'});
        }
        else
        {
            var url = 'http://store.steampowered.com/api/appdetails/?appids='+appid+'&cc=EE&l=english&v=1';
            request(url, async function(err, response, body) {
                const gameStoreData = JSON.parse(body);
            
                if(!gameStoreData){
                    return res.status(400).json({msg: 'could not find game in store'});
                }
            
                res.json(gameStoreData);
            });
        }
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;