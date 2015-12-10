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
      render json: todo.errors, status: 400
    end
  end

  def update
  end

  private

  def todo_params
    params.require(:todo).permit(:text, :completed)
  end
end
