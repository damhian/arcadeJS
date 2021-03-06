import { useMutation } from '@apollo/client';
import swal from 'sweetalert2'
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SnakeEngine, {startGame, getScore, getFinish} from '../lib/SnakeEngine';
import { FETCH_SNAKE, POST_SNAKE } from '../queries'
let x = false

export default ({ location }) => {
    // const {loading, error, data} = useQuery()
    const gameCanvas = useRef()
    const history = useHistory()
    const [score, setScore] = useState(-1)
    const [add_score] = useMutation(POST_SNAKE, {
        refetchQueries: [{ query: FETCH_SNAKE }]
    });
    let username = location.data.username

    setInterval(() => {
        const isFinish = getFinish()
        if (isFinish && x === false) {
            x = true
            // history.push('/leaderboard')
            swal.fire({
                title: `Congratulations, ${username}!`,
                text: `Your final score: ${getScore()}`,
            });
            function send_score() {
                add_score({
                    variables: {
                        username,
                        score: getScore()
                    }
                });
                history.push({ pathname: '/games' });    
            }
            send_score();
        }
    }, 1000)

    useEffect( () => {
        console.log(score, 'ia<<');
        if (score !== -1) {
            
        } 
    }, [score])

    // useEffect(() => {
    //     console.log('>>', isFinish);
    // }, [isFinish])
    
    useEffect(() => {
        return () => {
            // console.log('inidoa>>>>>,', getScore() );
            // setScore(getScore())
            console.log('in>>', getScore(), username);
        }
    }, [])

    useEffect(() => {
        // diff => location.data.diff // isinya antara 'easy', 'med', 'hard

        const canvas = gameCanvas.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            ctx.fillStyle = 'white'
            ctx.fillRect(0,0,canvas.width, canvas.height)
            const snake = new SnakeEngine(100, 100, 0, SnakeEngine.INITIAL_LENGTH, ctx)
            const game = {
                snake,
                foods: [],
            }
            startGame(game, ctx, username)
        }
    }, [])

    // if (loading) return (<>loading..</>)
    // if (error) return (<>Error</>)

    return (
        <>
            <div className="wrapper">
                <p></p>
                <p id="score">Score: 0</p>
                <img src="snake.jpg" style={{display:'none'}} id="snake-img"></img>
                <canvas ref={gameCanvas} id="map" width="600" height="600"></canvas>
            </div>
        </>
    )
}