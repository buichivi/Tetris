import TetrisBoard from './components/TetrisBoard';

function App() {
    return (
        <div className="w-screen flex items-center justify-center h-screen relative">
            <TetrisBoard />
            <img
                src="src/assets/background.jpg"
                alt=""
                className="-z-[1] absolute top-0 left-0 size-full object-cover"
            />
        </div>
    );
}

export default App;
