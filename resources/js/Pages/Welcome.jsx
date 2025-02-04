import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, quizzes }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-black text-white">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-green-600 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                {/* Logo or branding can go here */}
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-green-400 ring-1 ring-transparent transition hover:text-green-300 focus:outline-none focus-visible:ring-green-400"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-green-400 ring-1 ring-transparent transition hover:text-green-300 focus:outline-none focus-visible:ring-green-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="ml-4 rounded-md px-3 py-2 text-green-400 ring-1 ring-transparent transition hover:text-green-300 focus:outline-none focus-visible:ring-green-400"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                        <main className="mt-6">
                            <h1 className="text-3xl font-bold text-center mb-6 text-green-400">Available Quizzes</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {quizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="bg-black border border-gray-700 rounded-lg shadow-md p-4"
                                    >
                                        <h2 className="text-xl font-semibold text-green-400">{quiz.title}</h2>
                                        <p className="text-sm text-gray-400 mt-2">
                                            Topic: {quiz.topic?.name || 'No Topic'}
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Difficulty: {quiz.difficulty}
                                        </p>
                                        <Link
                                            href={route('quiz.show', quiz.id)}
                                            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 focus:outline-none focus-visible:ring focus-visible:ring-green-400"
                                        >
                                            Take Quiz
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </main>
                        <footer className="py-16 text-center text-sm text-gray-400">
                            Under construction PURPLE ORCA &copy; 2025
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}