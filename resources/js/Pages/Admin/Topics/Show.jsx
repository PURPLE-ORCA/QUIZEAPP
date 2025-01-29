// resources/js/Pages/Admin/Topics/Show.jsx
import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function TopicsShow({ topic }) {
    return (
        <div>
            <h1>Topic Details</h1>
            <p><strong>Name:</strong> {topic.name}</p>
            <p><strong>Slug:</strong> {topic.slug}</p>
            <div>
                <Link href={`/admin/topics/${topic.id}/edit`}>
                    <button>Edit</button>
                </Link>
                <form
                    method="POST"
                    action={`/admin/topics/${topic.id}`}
                    onSubmit={(e) => {
                        if (!confirm('Are you sure?')) e.preventDefault();
                    }}
                    style={{ display: 'inline' }}
                >
                    <input type="hidden" name="_method" value="DELETE" />
                    <button type="submit">Delete</button>
                </form>
            </div>
        </div>
    );
}