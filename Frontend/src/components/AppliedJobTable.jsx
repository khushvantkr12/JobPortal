
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

export default function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  // Define status to style mapping with consistent hover styles
  const statusStyles = {
    pending: 'bg-yellow-300 text-yellow-800 hover:bg-yellow-300',
    rejected: 'bg-red-300 text-red-800 hover:bg-red-300',
    accepted: 'bg-green-300 text-green-800 hover:bg-green-300',
  };

  return (
    <div>
      <Table>
        <TableCaption>A List of your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span className="font-bold bg-yellow-300 text-1.5xl">
              You haven't applied to any job yet.
            </span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob?._id}>
                <TableCell>{appliedJob?.createdAt.split('T')[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={statusStyles[appliedJob?.status] || 'bg-gray-300 text-gray-800 hover:bg-gray-300'}>
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

