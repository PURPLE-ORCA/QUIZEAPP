import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, quizzes }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                {/* Logo or branding can go here */}
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <h1 className="text-3xl font-bold text-center mb-6">Available Quizzes</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {quizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
                                    >
                                        <h2 className="text-xl font-semibold">{quiz.title}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            Topic: {quiz.topic?.title || 'No Topic'}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Difficulty: {quiz.difficulty}
                                        </p>
                                        <Link
                                            href={route('quiz.show', quiz.id)}
                                            className="mt-4 inline-block bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700"   
                                        >
                                            Take Quiz
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Under construction PURPLE ORCA &copy; 2025
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}