<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    // Show all topics (GET /topics)
    public function index()
    {
        $topics = Topic::all(); 
        return inertia('Admin/Topics/Index', compact('topics'));
    }

    // Show form to create a new topic (GET /topics/create)
    public function create()
    {
        return inertia('Admin/Topics/Create'); // Blank slate for your creativity.
    }

    // Store a new topic in the database (POST /topics)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:topics,name',
            'slug' => 'nullable|string|max:255|unique:topics,slug',
        ]);

        Topic::create([
            'name' => $request->name,
            'slug' => $request->slug ?? strtolower(str_replace(' ', '-', $request->name)), // Auto-generate slug if lazy.
        ]);

        return redirect()->route('topics.index')->with('success', 'Topic created!');
    }

    public function show(Topic $topic)
    {
        return inertia('Admin/Topics/Show', compact('topic')); 
    }

    // Show form to edit a topic (GET /topics/{topic}/edit)
    public function edit(Topic $topic)
    {
        return inertia('Admin/Topics/Edit', compact('topic')); // Time to fix your mistakes.
    }

    // Update a topic in the database (PUT/PATCH /topics/{topic})
    public function update(Request $request, Topic $topic)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:topics,name,' . $topic->id,
            'slug' => 'nullable|string|max:255|unique:topics,slug,' . $topic->id,
        ]);

        $topic->update([
            'name' => $request->name,
            'slug' => $request->slug ?? strtolower(str_replace(' ', '-', $request->name)),
        ]);

        return redirect()->route('topics.index')->with('success', 'Topic updated! Still useless, though.');
    }

    // Delete a topic from the database (DELETE /topics/{topic})
    public function destroy(Topic $topic)
    {
        $topic->delete(); 
        return redirect()->route('topics.index')->with('success', 'Topic deleted! Hope no quizzes depended on that.');
    }
}