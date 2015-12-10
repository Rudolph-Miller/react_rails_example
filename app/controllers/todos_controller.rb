class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @todos = Todo.all
    respond_to do |format|
      format.html
      format.json { render json: @todos, each_serializer: TodoSerializer }
    end
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: { status: 'ok', todo: todo }
    else
      render json: { messages: todo.errors.full_messages, status: 400 }
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(update_params)
      render json: { status: 'ok', todo: todo }
    else
      render json: { messages: todo.errors.full_messages, status: 400 }
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:text, :completed)
  end

  def update_params
    params.require(:todo).permit(:text, :completed)
  end
end
