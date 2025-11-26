# Task Management System Documentation

This document describes the complete task management system with MongoDB integration, including regular tasks, auto-tasks, and checklist templates.

## 📋 Overview

The task management system consists of three main components:

1. **Tasks** - Regular manual tasks that can be assigned to users
2. **Auto-Tasks** - Automated tasks that are created based on events (check-in, check-out, etc.)
3. **Checklist Templates** - Reusable checklists that can be applied to tasks

## 🗄️ Database Models

### Task Model

**Location:** `models/Task.js`

**Key Fields:**
- `title` - Task title (required)
- `description` - Task description
- `status` - Task status: 'To Do', 'In Progress', 'Completed', 'Pending', 'Cancelled'
- `priority` - Priority level: 'Low', 'Medium', 'High'
- `assignee` - User assigned to the task (ObjectId reference)
- `supervisor` - Supervisor overseeing the task (ObjectId reference)
- `group` - Group/team name
- `startDate`, `startTime`, `endDate`, `endTime` - Task timing
- `dueDate` - Task due date
- `listing`, `listingId` - Property listing information
- `channel` - Booking channel (Airbnb, Booking.com, etc.)
- `reservation`, `reservationId` - Reservation information
- `category` - Task category
- `cost`, `costCurrency`, `costDescription` - Cost information
- `autoGenerateExpense` - Whether to auto-generate expense
- `checklist` - Array of checklist items with completion status
- `attachments` - File attachments
- `customFields` - Custom field values
- `feedbackScore`, `resolutionNote`, `feedbackNote` - Feedback information
- `isArchived`, `archivedDate`, `archivedBy` - Archive management
- `autoTaskId` - Reference to auto-task if created from one
- `checklistTemplateId` - Reference to checklist template if used
- `createdBy`, `updatedBy` - User tracking

### AutoTask Model

**Location:** `models/AutoTask.js`

**Key Fields:**
- `name` - Auto-task name (required)
- `description` - Description
- `startingEvent` - Event that triggers task creation: 'Check-in', 'Check-out', 'Booking Confirmed', etc.
- `startsAtValue`, `startsAtUnit`, `startsAtTiming`, `startsAtEvent` - Start timing configuration
- `shouldEndByValue`, `shouldEndByUnit`, `shouldEndByTiming`, `shouldEndByEvent` - Due date configuration
- `status` - 'Active' or 'Inactive'
- `assignee`, `supervisor`, `group`, `category` - Assignment information
- `linkedChannel` - Channel filter
- `linkedListings` - Array of listing IDs
- `addAutomaticallyNewListings` - Auto-add new listings
- `checklistTemplateId` - Checklist template to use
- `cost`, `costCurrency`, `costDescription` - Cost information
- `autoGenerateExpense` - Auto-generate expense flag
- `createTasksForExistingReservations` - Create tasks for existing reservations
- `lastRunAt`, `tasksCreated` - Execution tracking

### ChecklistTemplate Model

**Location:** `models/ChecklistTemplate.js`

**Key Fields:**
- `name` - Template name (required, unique)
- `description` - Description
- `tasks` - Array of task items with order
- `category` - Category for organization
- `usageCount` - Number of times used
- `isActive` - Active status
- `createdBy` - Creator reference

## 🔌 API Endpoints

### Tasks API (`/api/tasks`)

All endpoints require authentication (Bearer token).

#### Get All Tasks
```http
GET /api/tasks?status=In Progress&priority=High&assignee=USER_ID&page=1&limit=50&sortBy=dueDate&sortOrder=asc
```

**Query Parameters:**
- `status` - Filter by status (can be array)
- `priority` - Filter by priority (can be array)
- `assignee` - Filter by assignee user ID
- `supervisor` - Filter by supervisor user ID
- `listing` - Filter by listing name (partial match)
- `channel` - Filter by channel (partial match)
- `isArchived` - Filter archived tasks (true/false, default: false)
- `search` - Search in title and description
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50)
- `sortBy` - Sort field (default: 'dueDate')
- `sortOrder` - Sort order: 'asc' or 'desc' (default: 'asc')

#### Get Single Task
```http
GET /api/tasks/:id
```

#### Create Task
```http
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Property Inspection",
  "description": "Conduct thorough inspection",
  "status": "To Do",
  "priority": "High",
  "assignee": "USER_ID",
  "supervisor": "USER_ID",
  "dueDate": "2024-02-15",
  "listing": "Villa Del Sol",
  "channel": "Airbnb",
  "checklist": ["Check lights", "Test AC", "Inspect bathroom"]
}
```

#### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "In Progress",
  "priority": "Medium"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

#### Archive Task
```http
POST /api/tasks/:id/archive
Authorization: Bearer <token>
```

#### Restore Task
```http
POST /api/tasks/:id/restore
Authorization: Bearer <token>
```

#### Complete Checklist Item
```http
POST /api/tasks/:id/checklist/:itemIndex/complete
Authorization: Bearer <token>
```

#### Duplicate Task
```http
POST /api/tasks/:id/duplicate
Authorization: Bearer <token>
```

### Auto-Tasks API (`/api/auto-tasks`)

#### Get All Auto-Tasks
```http
GET /api/auto-tasks?status=Active&startingEvent=Check-in&page=1&limit=50
```

#### Get Single Auto-Task
```http
GET /api/auto-tasks/:id
```

#### Create Auto-Task
```http
POST /api/auto-tasks
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Daily Property Check",
  "description": "Perform daily inspection",
  "startingEvent": "Check-in",
  "startsAtValue": 2,
  "startsAtUnit": "Hours",
  "startsAtTiming": "Before",
  "shouldEndByValue": 4,
  "shouldEndByUnit": "Hours",
  "status": "Active",
  "linkedChannel": "Airbnb",
  "linkedListings": ["listing1", "listing2"]
}
```

#### Update Auto-Task
```http
PUT /api/auto-tasks/:id
```

#### Delete Auto-Task
```http
DELETE /api/auto-tasks/:id
```

#### Toggle Status
```http
POST /api/auto-tasks/:id/toggle-status
```

#### Run Auto-Task Manually
```http
POST /api/auto-tasks/:id/run
```

#### Duplicate Auto-Task
```http
POST /api/auto-tasks/:id/duplicate
```

### Checklist Templates API (`/api/checklist-templates`)

#### Get All Templates
```http
GET /api/checklist-templates?category=Inspection&search=property&page=1&limit=50
```

#### Get Single Template
```http
GET /api/checklist-templates/:id
```

#### Create Template
```http
POST /api/checklist-templates
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Property Inspection Checklist",
  "description": "Standard property inspection checklist",
  "category": "Inspection",
  "tasks": [
    "Check all lights and switches",
    "Test air conditioning",
    "Inspect bathroom fixtures",
    "Check kitchen appliances"
  ]
}
```

#### Update Template
```http
PUT /api/checklist-templates/:id
```

#### Delete Template
```http
DELETE /api/checklist-templates/:id
```

#### Duplicate Template
```http
POST /api/checklist-templates/:id/duplicate
```

## 🔄 Task Flow

### 1. Creating a Regular Task

1. User creates a task via `POST /api/tasks`
2. Task is assigned to an assignee and supervisor
3. Checklist items can be added (from template or manually)
4. Task appears in "Manage Tasks" view

### 2. Creating an Auto-Task

1. User creates an auto-task via `POST /api/auto-tasks`
2. Auto-task is configured with:
   - Starting event (check-in, check-out, etc.)
   - Timing configuration
   - Assignment rules
   - Checklist template (optional)
3. When the event occurs, tasks are automatically created
4. Auto-tasks are managed in "Manage Auto-tasks" view

### 3. Using Checklist Templates

1. User creates a checklist template via `POST /api/checklist-templates`
2. Template can be used when creating tasks or auto-tasks
3. When a task is created with a template, checklist items are populated
4. Templates can be reused across multiple tasks

### 4. Task Lifecycle

1. **Created** - Task is created (status: "To Do")
2. **In Progress** - Assignee starts working on task
3. **Completed** - Task is finished
4. **Archived** - Task is moved to archive (not deleted)
5. **Restored** - Archived task can be restored

### 5. Archive Management

- Tasks can be archived via `POST /api/tasks/:id/archive`
- Archived tasks are filtered out by default (`isArchived=false`)
- View archived tasks by setting `isArchived=true` in query
- Restore archived tasks via `POST /api/tasks/:id/restore`

## 👥 User Management

### Role-Based Access

Tasks respect the RBAC system:
- **Super Admin** - Can manage all tasks
- **Manager** - Can manage tasks for their assigned users
- **Associate** - Can view and update assigned tasks
- **Team** - Basic access to assigned tasks

### Assignment Flow

1. **Assignee** - User responsible for completing the task
2. **Supervisor** - User overseeing the task completion
3. **Created By** - User who created the task
4. **Updated By** - User who last updated the task

## 📊 Filtering and Sorting

Tasks support comprehensive filtering:
- By status (multiple)
- By priority (multiple)
- By assignee/supervisor
- By listing/channel
- By date range
- By search term
- Archive status

Sorting options:
- Due date
- Priority
- Status
- Created date
- Custom fields

## 🔍 Search Functionality

Search works across:
- Task title
- Task description
- Listing names
- Channel names

## 📝 Checklist Management

### Checklist Structure

```javascript
{
  item: "Check all lights",
  completed: false,
  completedAt: null,
  completedBy: null
}
```

### Completing Checklist Items

1. Use `POST /api/tasks/:id/checklist/:itemIndex/complete`
2. Item is marked as completed
3. Completion time and user are recorded
4. Task completion can be tracked via checklist progress

## 🚀 Integration with Frontend

### Example: Fetching Tasks

```typescript
const fetchTasks = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/tasks?page=1&limit=50`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data;
};
```

### Example: Creating a Task

```typescript
const createTask = async (taskData) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  const data = await response.json();
  return data.data;
};
```

## 🔐 Security

- All routes require authentication
- Users can only access tasks they're assigned to or have permission for
- Archive/restore operations are logged
- All operations track the user who performed them

## 📈 Performance

- Indexes on frequently queried fields
- Pagination support for large datasets
- Efficient population of user references
- Optimized filtering and sorting

## 🛠️ Future Enhancements

- Auto-task execution scheduler
- Task notifications
- Task dependencies
- Recurring tasks
- Task templates
- Bulk operations
- Advanced reporting

## 📚 Related Documentation

- [MongoDB Setup Guide](./MONGODB_SETUP.md)
- [Default Login Credentials](./DEFAULT_LOGIN_CREDENTIALS.md)

