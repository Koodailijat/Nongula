import { useState } from 'react';
import { Badge } from '../../../../stories/components/Badge/Badge.tsx';

export function Streak() {
    const [streakCount] = useState(0);
    return <>{streakCount > 2 && <Badge>{streakCount}🔥</Badge>}</>;
}
