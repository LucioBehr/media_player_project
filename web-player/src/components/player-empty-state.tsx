type PlayerEmptyStateProps = {
  title: string;
  description: string;
};

function PlayerEmptyState({ title, description }: PlayerEmptyStateProps) {
  return (
    <div className="player-empty">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export { PlayerEmptyState };
