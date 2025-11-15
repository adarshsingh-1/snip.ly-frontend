import LinkItem from './LinkItem';

export default function LinkList({ links, onDelete }) {
  // Add safety check - ensure links is an array
  if (!links || !Array.isArray(links) || links.length === 0) {
    return (
      <div className="text-center mt-16 py-12">
        <div className="text-6xl mb-4">🔗</div>
        <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">No links yet</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Create your first short link above! 👆</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Your links <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({links.length})</span>
        </h3>
      </div>
      <div className="space-y-3">
        {links.map((link) => (
          <LinkItem key={link._id} link={link} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}